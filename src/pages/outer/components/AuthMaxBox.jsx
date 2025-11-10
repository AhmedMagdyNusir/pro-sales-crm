import { Link } from 'react-router-dom';
import defaultImage from '../../../assets/defaultImage.svg';
import CenterBox from '../../../components/ui/CenterBox';

/**
 * `AuthMaxBox` is a `CenterBox` component that presents an image, a title, and its children in a centered box on the screen.
 * It can optionally display a link that redirects to a different page when clicked.
 *
 * The component is divided into two main sections:
 * 1. The first section is for an image, which is displayed on large screens only.
 * 2. The second section is for the title, the child elements, and an optional leave link.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.image - The URL of the image to be displayed. If not provided, a default image is used.
 * @param {string} props.title - The title to be displayed above the child elements. If not provided, the title is not displayed.
 * @param {string} props.subTitle - The subTitle to be displayed blow the title. If not provided, the subTitle is not displayed.
 * @param {Object} props.leave - An object with `hint`, `link`, and `label` properties for the leave link. If not provided, the leave link is not displayed.
 * @param {ReactNode} props.children - The child elements to be rendered inside the box.
 * @returns {ReactElement} A `ScreenCenterContainer` element that wraps a div, which in turn wraps the image, the title, the child elements, and an optional leave link.
 */

function AuthMaxBox({ className = '', image = defaultImage, title, subTitle, leave, children }) {
  return (
    <CenterBox className={`${className}`}>
      <section className="xl:flex-center hidden w-[500px] p-12">
        <img src={image} alt={title} className="w-[85%]" />
      </section>
      <div className="m-12 hidden w-[1px] rounded bg-gray-100 xl:flex">{/* Divider */}</div>
      <section className="flex flex-1 flex-col gap-3">
        {title && <h1 className="">{title}</h1>}
        {subTitle && <p className="text-sm">{subTitle}</p>}
        {children}
        {leave && (
          <div className="flex flex-wrap justify-center gap-1">
            {leave.hint && <span className="text-gray-800">{leave.hint}</span>}
            <Link className="font-bold text-pro-300 transition-colors hover:text-pro-200" to={leave.link}>
              {leave.label}
            </Link>
          </div>
        )}
      </section>
    </CenterBox>
  );
}

export default AuthMaxBox;
