module.exports = {
  jsx: {
    babelConfig: {
      plugins: [
        [
          "@svgr/babel-plugin-replace-jsx-attribute-value",
          {
            values: [
              {
                value: "#000",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.colorSet.grey800",
                literal: true,
              },
              {
                value: "#FFF",
                newValue: "iconColor ? iconColor : theme.color.white1000",
                literal: true,
              },
              {
                value: "#C7C7CC",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.colorSet.grey800",
                literal: true,
              },
              {
                value: "#8E8E93",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.colorSet.grey800",
                literal: true,
              },
              {
                value: "#E9EDF0",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.colorSet.grey100",
                literal: true,
              },
              {
                value: "#AEB8BD",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.colorSet.grey400",
                literal: true,
              },
              {
                value: "#59646A",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.colorSet.grey300",
                literal: true,
              },
              {
                value: "#979797",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.colorSet.grey300",
                literal: true,
              },
              {
                value: "#1F262A",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.colorSet.grey800",
                literal: true,
              },
              {
                value: "#FB2942",
                newValue: "iconColor ? iconColor : theme.color.red700",
                literal: true,
              },
              {
                value: "#17CEDF",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.colorSet.color.grey800",
                literal: true,
              },
              {
                value: "#22BCD6",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.secondary.main",
                literal: true,
              },
              {
                value: "#FCBA02",
                newValue: "iconColor ? iconColor : theme.color.yellow900",
                literal: true,
              },
              {
                value: "#009CAD",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.secondary.main",
                literal: true,
              },
              {
                value: "#010505",
                newValue: 'iconColor ? iconColor : "#010505"',
                literal: true,
              },
              {
                value: "#231815",
                newValue:
                  "iconColor ? iconColor : theme.colorV2.colorSet.grey800",
                literal: true,
              },
            ],
          },
        ],
      ],
    },
  },
  template: require("./svgr.template"),
};
