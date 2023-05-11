export default jest.fn().mockImplementation(() => ({
  open: jest.fn(),
  setUrl: jest.fn(),
  getUrl: jest.fn(),
  setClose: jest.fn(),
  addEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  forceClose: jest.fn(),
  sendClose: jest.fn(),
  closeTickTask: jest.fn(),
  checkSelfClosed: jest.fn(),
}));
