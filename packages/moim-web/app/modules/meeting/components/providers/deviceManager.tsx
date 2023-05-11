import * as React from "react";
import { useIntl } from "react-intl";
import {
  DefaultDeviceController,
  DeviceChangeObserver,
  VideoInputDevice,
} from "amazon-chime-sdk-js";
import { useMeetingManager } from "amazon-chime-sdk-component-library-react";
import { logger } from "app/modules/meeting";
import { isMobileAgent, isTablet } from "common/helpers/browserDetect";

import { IButton } from "common/components/modalLayout/alert/types";
import AlertDialog from "common/components/alertDialog";
import useOpenState from "common/hooks/useOpenState";
import { pushLog } from "common/helpers/logCollector";

type MOBILE_VIDEO_INPUT_TYPE = "front" | "back";

interface IContext {
  isLoading: boolean;

  audioOutputList: any[];
  audioInputList: any[];
  videoList: any[];
  selectedAudioOutput: Moim.Id | null;
  selectedAudioInput: Moim.Id | null;
  selectedVideo: VideoInputDevice | null;

  currentMobileInputStatus: MOBILE_VIDEO_INPUT_TYPE;
  isDeniedPermission: boolean;

  muteAudioOutput: boolean;
  muteAudioInput: boolean;
  muteVideo: boolean;

  defaultDeviceController: DefaultDeviceController | null;

  initializeDeviceList(): void;
  showDevicePermissionAlert(): void;
  dismissAlert(): void;
  toggleMobileVideoInput(): Promise<void>;
  setMuteAudioOutput(state: boolean): void;
  setMuteAudioInput(state: boolean): void;
  setMuteVideo(state: boolean): void;
  selectAudioOutput(id: Moim.Id): Promise<void>;
  selectAudioInput(id: Moim.Id): Promise<void>;
  selectVideo(id: VideoInputDevice): Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const EMPTY_FUNC_1 = async (_id: Moim.Id) => {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
const EMPTY_FUNC_2 = (_: boolean) => {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
const EMPTY_FUNC_3 = async () => {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
const EMPTY_FUNC_4 = async (_: VideoInputDevice) => {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
const EMPTY_FUNC_5 = async () => {};

const INITIAL_CONTEXT: IContext = {
  isLoading: true,

  audioOutputList: [],
  audioInputList: [],
  videoList: [],
  selectedAudioOutput: null,
  selectedAudioInput: null,
  selectedVideo: null,

  currentMobileInputStatus: "front",
  isDeniedPermission: true,

  muteAudioOutput: false,
  muteAudioInput: false,
  muteVideo: false,

  defaultDeviceController: null,

  initializeDeviceList: EMPTY_FUNC_5,
  showDevicePermissionAlert: EMPTY_FUNC_5,
  dismissAlert: EMPTY_FUNC_5,
  toggleMobileVideoInput: EMPTY_FUNC_3,
  setMuteAudioOutput: EMPTY_FUNC_2,
  setMuteAudioInput: EMPTY_FUNC_2,
  setMuteVideo: EMPTY_FUNC_2,
  selectAudioOutput: EMPTY_FUNC_1,
  selectAudioInput: EMPTY_FUNC_1,
  selectVideo: EMPTY_FUNC_4,
};

export const DeviceManagerContext = React.createContext<IContext>(
  INITIAL_CONTEXT,
);

export const DeviceManagerProvider: React.FC<{
  children: React.ReactChild;
}> = ({ children }) => {
  const intl = useIntl();
  const meetingManager = useMeetingManager();
  const isMobile = React.useMemo(() => isMobileAgent() || isTablet(), []);

  const [isLoading, setLoadStatus] = React.useState(INITIAL_CONTEXT.isLoading);
  const [audioOutputList, setAudioOutputList] = React.useState<any[]>([]);
  const [audioInputList, setAudioInputList] = React.useState<any[]>([]);
  const [videoList, setVideoList] = React.useState<any[]>([]);
  const [isDeniedPermission, setIsDeniedPermission] = React.useState<boolean>(
    INITIAL_CONTEXT.isDeniedPermission,
  );
  const [muteAudioOutput, setMuteAudioOutput] = React.useState<boolean>(
    INITIAL_CONTEXT.muteAudioOutput,
  );
  const [muteAudioInput, setMuteAudioInput] = React.useState<boolean>(
    INITIAL_CONTEXT.muteAudioInput,
  );
  const [muteVideo, setMuteVideo] = React.useState<boolean>(
    INITIAL_CONTEXT.muteVideo,
  );
  const refDeviceController = React.useRef<DefaultDeviceController>(
    new DefaultDeviceController(logger, {
      enableWebAudio: true,
    }),
  );
  const [mobileVideoInputSelected, setMobileVideoInputSelect] = React.useState<
    MOBILE_VIDEO_INPUT_TYPE
  >(INITIAL_CONTEXT.currentMobileInputStatus);

  const [
    selectedAudioOutput,
    setSelectedAudioOutput,
  ] = React.useState<Moim.Id | null>(null);
  const [
    selectedAudioInput,
    setSelectedAudioInput,
  ] = React.useState<Moim.Id | null>(null);
  const [
    selectedVideo,
    setSelectedVideo,
  ] = React.useState<VideoInputDevice | null>(null);

  const [alertContext, setAlertContext] = React.useState<{
    title?: string;
    body: string;
    buttons: IButton[];
  }>({
    body: "",
    buttons: [],
  });
  const { isOpen: isOpenAlert, open: handleAlertOpen, close } = useOpenState();

  const notifyPermissionAlert = React.useCallback(() => {
    setAlertContext({
      title: intl.formatMessage({
        id: "dialog_video_chat_allow_device_title",
      }),
      body: intl.formatMessage({
        id: "dialog_video_chat_allow_device_body",
      }),
      buttons: [
        {
          text: intl.formatMessage({ id: "button_close" }),
          onClick: close,
        },
      ],
    });
    handleAlertOpen();
  }, [close, handleAlertOpen, intl]);

  const notifyNoDeviceAlert = React.useCallback(() => {
    setAlertContext({
      body: intl.formatMessage({
        id: "video_chat_no_device",
      }),
      buttons: [
        {
          text: intl.formatMessage({ id: "button_close" }),
          onClick: close,
        },
      ],
    });
    handleAlertOpen();
  }, [close, handleAlertOpen, intl]);

  const notifyDeviceChangeErrorAlert = React.useCallback(() => {
    setAlertContext({
      body: intl.formatMessage({
        id: "dialog_video_chat_device_unavailable",
      }),
      buttons: [
        {
          text: intl.formatMessage({ id: "button_close" }),
          onClick: close,
        },
      ],
    });
    handleAlertOpen();
  }, [close, handleAlertOpen, intl]);

  const requestPermission = React.useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setIsDeniedPermission(false);
    } catch (err) {
      if (err instanceof DOMException) {
        switch (err.name) {
          case "NotAllowedError": {
            // 권한을 허용해주세요
            setIsDeniedPermission(true);
            break;
          }
          default: {
            // 장치에서 알 수 없는 에러 발생
            console.error(
              ">>>>> [RUN] DeviceManager:requestPermission:DOMException:CommonError:",
              err,
            );
            break;
          }
        }
      } else {
        console.error(
          ">>>>> [RUN] DeviceManager:requestPermission:CommonError:",
          err,
        );
      }
    }
  }, []);

  const handleSelectAudioOutput = React.useCallback(
    async (deviceId: Moim.Id) => {
      try {
        await Promise.all([
          refDeviceController.current?.chooseAudioOutput(deviceId),
          meetingManager.audioVideo?.chooseAudioOutput(deviceId),
        ]);
        setSelectedAudioOutput(deviceId);
      } catch (err) {
        pushLog("handleSelectAudioOutput():Error", "meeting", {
          error: err,
          deviceId,
        });
      }
    },
    [meetingManager.audioVideo],
  );
  const handleSelectAudioInput = React.useCallback(
    async (deviceId: Moim.Id) => {
      try {
        await Promise.all([
          refDeviceController.current?.startAudioInput(deviceId),
          meetingManager.audioVideo?.startAudioInput(deviceId),
        ]);

        setSelectedAudioInput(deviceId);
      } catch (err) {
        pushLog("handleSelectAudioOutput():Error", "meeting", {
          error: err,
          deviceId,
        });
      }
    },
    [meetingManager.audioVideo],
  );
  const handleSelectVideo = React.useCallback(
    async (deviceInput: VideoInputDevice) => {
      try {
        await Promise.all([
          refDeviceController.current?.startVideoInput(deviceInput),
          meetingManager.audioVideo?.startVideoInput(deviceInput),
        ]);
        setSelectedVideo(deviceInput);
      } catch (err) {
        pushLog("handleSelectVideo():Error", "meeting", {
          error: err,
          deviceInput,
        });
        if ((err as any).cause?.name === "OverconstrainedError") {
          // NOTE: specify case
          const list = await refDeviceController.current.listVideoInputDevices();
          if (list.length) {
            if (
              deviceInput.hasOwnProperty("facingMode") &&
              (deviceInput as any).facingMode?.exact
            ) {
              const target = list.find(device =>
                (device as any)
                  .getCapabilities()
                  .facingMode.includes((deviceInput as any).facingMode.exact),
              );
              if (target) {
                handleSelectVideo(target.deviceId);
                return;
              }
            }
            handleSelectVideo(list[0].deviceId);
          } else {
            setSelectedVideo(null);
          }
        } else if ((err as any).cause?.name === "NotReadableError") {
          setAlertContext({
            body: intl.formatMessage({
              id: "해당 장치를 사용할 수 없습니다.(NotReadableError)",
            }),
            buttons: [
              {
                text: intl.formatMessage({ id: "button_close" }),
                onClick: close,
              },
            ],
          });
          setSelectedVideo(null);
          handleAlertOpen();
        } else if ((err as any).cause?.name === "NotAllowedError") {
          // NOTE: 케이스 구분 보고를 위해서 남겨둡니다.
          pushLog("handleSelectVideo::Error(NotAllowedError)", "meeting", {
            deviceInfo: deviceInput,
          });
          setSelectedVideo(null);
          notifyDeviceChangeErrorAlert();
        } else {
          // NOTE: general case errors.
          setSelectedVideo(null);
          notifyDeviceChangeErrorAlert();
        }
      }
    },
    [
      close,
      handleAlertOpen,
      intl,
      meetingManager.audioVideo,
      notifyDeviceChangeErrorAlert,
    ],
  );

  const handleMuteAudioOutput = React.useCallback((state: boolean) => {
    setMuteAudioOutput(state);
  }, []);

  const handleMuteAudioInput = React.useCallback(
    (state: boolean) => {
      if (isDeniedPermission) {
        notifyPermissionAlert();
        return;
      }

      if (!audioInputList.length) {
        notifyNoDeviceAlert();
        return;
      }

      if (state) {
        meetingManager.audioVideo?.realtimeMuteLocalAudio();
        refDeviceController.current.stopAudioInput();
      } else {
        meetingManager.audioVideo?.realtimeUnmuteLocalAudio();
        if (selectedAudioInput) {
          refDeviceController.current.startAudioInput(selectedAudioInput);
        }
      }
      setMuteAudioInput(state);
    },
    [
      audioInputList.length,
      isDeniedPermission,
      meetingManager.audioVideo,
      notifyNoDeviceAlert,
      notifyPermissionAlert,
      selectedAudioInput,
    ],
  );

  const handleMuteVideo = React.useCallback(
    (state: boolean) => {
      if (isDeniedPermission) {
        notifyPermissionAlert();
        return;
      }
      if (!videoList.length) {
        notifyNoDeviceAlert();
        return;
      }

      if (state) {
        meetingManager.audioVideo?.stopLocalVideoTile();
      } else {
        meetingManager.audioVideo?.startLocalVideoTile();
      }
      setMuteVideo(state);
    },
    [
      isDeniedPermission,
      meetingManager.audioVideo,
      notifyNoDeviceAlert,
      notifyPermissionAlert,
      videoList.length,
    ],
  );

  const toggleMobileVideoInput = React.useCallback(async () => {
    if (isDeniedPermission) {
      notifyPermissionAlert();
      return;
    }

    if (mobileVideoInputSelected === "front") {
      await handleSelectVideo({
        facingMode: {
          exact: "environment",
        },
      });
      setMobileVideoInputSelect("back");
    } else {
      await handleSelectVideo({
        facingMode: {
          exact: "user",
        },
      });
      setMobileVideoInputSelect("front");
    }
  }, [
    handleSelectVideo,
    isDeniedPermission,
    mobileVideoInputSelected,
    notifyPermissionAlert,
  ]);

  const fetchDevices = React.useCallback(async () => {
    try {
      setLoadStatus(true);
      await requestPermission();

      const devices = await Promise.all([
        refDeviceController.current.listAudioOutputDevices(),
        refDeviceController.current.listAudioInputDevices(),
        refDeviceController.current.listVideoInputDevices(),
      ]);

      if (devices[0].length) {
        setAudioOutputList(devices[0]);
        handleSelectAudioOutput(devices[0][0].deviceId);
      }
      if (devices[1].length) {
        setAudioInputList(devices[1]);
        handleSelectAudioInput(devices[1][0].deviceId);
      }
      if (devices[2].length) {
        setVideoList(devices[2]);
        handleSelectVideo(
          isMobile
            ? {
                facingMode: {
                  exact: "user",
                },
              }
            : devices[2][0].deviceId,
        );
      }
    } finally {
      setLoadStatus(false);
    }
  }, [
    handleSelectAudioInput,
    handleSelectAudioOutput,
    handleSelectVideo,
    isMobile,
    requestPermission,
  ]);

  React.useEffect(() => {
    const listener: DeviceChangeObserver = {
      audioInputsChanged: list => {
        if (list) {
          setAudioOutputList(list);
        }
      },
      audioOutputsChanged: list => {
        if (list) {
          setAudioInputList(list);
        }
      },
      videoInputsChanged: list => {
        if (list) {
          setVideoList(list);
        }
      },
    };

    meetingManager.audioVideo?.addDeviceChangeObserver(listener);

    return () => {
      meetingManager.audioVideo?.removeDeviceChangeObserver(listener);
    };
  }, [meetingManager.audioVideo]);

  return (
    <DeviceManagerContext.Provider
      value={{
        isLoading,
        audioOutputList,
        audioInputList,
        videoList,
        selectedAudioOutput,
        selectedAudioInput,
        selectedVideo,
        muteAudioOutput,
        muteAudioInput,
        muteVideo,

        currentMobileInputStatus: mobileVideoInputSelected,

        defaultDeviceController: refDeviceController.current,

        isDeniedPermission,

        initializeDeviceList: fetchDevices,

        showDevicePermissionAlert: notifyPermissionAlert,
        dismissAlert: close,
        toggleMobileVideoInput,

        setMuteAudioOutput: handleMuteAudioOutput,
        setMuteAudioInput: handleMuteAudioInput,
        setMuteVideo: handleMuteVideo,

        selectAudioOutput: handleSelectAudioOutput,
        selectAudioInput: handleSelectAudioInput,
        selectVideo: handleSelectVideo,
      }}
    >
      {children}
      <AlertDialog
        open={isOpenAlert}
        title={alertContext.title}
        content={alertContext.body}
        rightButtons={alertContext.buttons}
        onClose={close}
      />
    </DeviceManagerContext.Provider>
  );
};

export function useDeviceManager() {
  return React.useContext(DeviceManagerContext);
}
