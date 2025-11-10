/**
 * `CaptionCard` is a component that displays an image, a title, and a paragraph in a column layout.
 *
 * The component is styled as a flex container with its children stacked vertically and centered.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.image - The URL of the image to be displayed. If not provided, the image is not displayed.
 * @param {string} props.title - The title to be displayed below the image.
 * @param {string} props.paragraph - The paragraph to be displayed below the title.
 * @returns {ReactElement} A div element that wraps the image, the title, and the paragraph.
 */

function CaptionCard({ className = '', image, title, paragraph }) {
  return (
    <div className={'flex flex-col items-center gap-3 ' + className}>
      {image && (
        <div className="h-[215px] w-[215px]">
          <img className="h-full" src={image} alt={title} />
        </div>
      )}
      <h1 className="text-center">{title}</h1>
      <p className="text-center">{paragraph}</p>
    </div>
  );
}

export default CaptionCard;
