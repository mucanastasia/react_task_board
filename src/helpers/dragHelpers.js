const dark = {
    bg: 'rgb(24, 28, 31, 0.5)',
    color: 'rgb(170, 180, 189, 0.4)',
    borderColor: '#4B5565',
};
const light = {
    bg: 'rgb(255, 255, 255, 0.7)',
    color: 'rgb(0, 0, 0, 0.5)',
    borderColor: '#dddddd',
};


export const createDragImage = (e, theme) => {
    // Styles for the custom ghost drag image
    const dragImage = e.target.cloneNode(true);
    dragImage.style.width = `${e.target.offsetWidth}px`;
    dragImage.style.height = `${e.target.offsetHeight}px`;
    dragImage.style.backgroundColor = `${theme === 'dark' ? dark.bg : light.bg}`;
    dragImage.style.color = `${theme === 'dark' ? dark.color : light.color}`;
    dragImage.style.position = 'absolute';
    dragImage.style.border = `1px dashed ${theme === 'dark' ? dark.borderColor : light.borderColor}`;
    dragImage.style.top = '-99999px';
    dragImage.childNodes[0].childNodes[0].style.opacity = '0.4';
    dragImage.childNodes[0].childNodes[2].style.opacity = '0';
    dragImage.childNodes[0].childNodes[3].style.opacity = '0';
    document.body.appendChild(dragImage);
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setDragImage(dragImage, offsetX, offsetY);
    // Removing the clone image
    setTimeout(() => document.body.removeChild(dragImage), 0);
};