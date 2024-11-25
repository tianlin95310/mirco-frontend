/*eslint-disable*/

function parseColor(hexStr) {
  return hexStr.length === 4 ? hexStr.substr(1).split('').map(function(s) {
    return 0x11 * parseInt(s, 16);
  }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(function(s) {
    return parseInt(s, 16);
  })
};

// zero-pad 1 digit to 2
function pad(s) {
  return (s.length === 1) ? '0' + s : s;
};

/**
 * @param {开始颜色} start 
 * @param {结束颜色} end 
 * @param {颜色分解次数} steps 
 * @param {（暂时理解为透明一点）} progress 
 * @returns 当前颜色
 */
function gradientColors(start, end, steps, progress) {
  let i, j, ms, me, output = [],
    so = [];
  let gamma = 1;
  let normalize = function(channel) {
    return Math.pow(channel / 255, gamma);
  };
  start = parseColor(start).map(normalize);
  end = parseColor(end).map(normalize);

  for (i = 0; i < steps; i++) {
    ms = i / (steps - 1);
    me = 1 - ms;
    for (j = 0; j < 3; j++) {
      so[j] = pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
    }
    output.push('#' + so.join(''));
  }
  return output[progress];
};

export default gradientColors
