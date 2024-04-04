export const createDragImage = (e) => {
    // Styles for the custom ghost drag image
    const dragImage = e.target.cloneNode(true);
    dragImage.style.width = `${e.target.offsetWidth}px`;
    dragImage.style.height = `${e.target.offsetHeight}px`;
    dragImage.style.backgroundColor = 'rgb(255, 255, 255, 0.7)';
    dragImage.style.color = 'rgb(0, 0, 0, 0.5)';
    dragImage.style.position = 'absolute';
    dragImage.style.border = '1px dashed #dddddd';
    dragImage.style.top = '-99999px';
    dragImage.firstElementChild.style.opacity = '0.5';
    document.body.appendChild(dragImage);
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    e.dataTransfer.setDragImage(dragImage, offsetX, offsetY);
    // Removing the clone image
    setTimeout(() => document.body.removeChild(dragImage), 0);
};