export const getRandomColor = () => {
  const hexToRgbA = (hexCode: string, opacity = 1) => {
    let hex = hexCode.replace("#", "");

    if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    /* Backward compatibility for whole number based opacity values. */
    if (opacity > 1 && opacity <= 100) {
      opacity = opacity / 100;
    }

    return `rgba(${r},${g},${b},${opacity})`;
  };
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return hexToRgbA("#" + randomColor, 0.2);
};
