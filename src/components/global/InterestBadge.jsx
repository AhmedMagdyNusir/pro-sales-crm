import { colorPairs } from '../../utils/utils';

export default function InterestBadge({ interest, colorId }) {
  let colorPair;
  switch (colorId) {
    case 1:
      colorPair = colorPairs[0];
      break;
    case 2:
      colorPair = colorPairs[1];
      break;
    case 3:
      colorPair = colorPairs[2];
      break;
    case 4:
      colorPair = colorPairs[3];
      break;
    case 5:
      colorPair = colorPairs[4];
      break;
    default:
      colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
      break;
  }
  return (
    <div
      className="text-nowrap rounded-full p-1 px-3 text-xs sm:text-sm"
      style={{ backgroundColor: colorPair.bg, color: colorPair.text, boxShadow: `0px 1px 1px ${colorPair.text}35` }}
    >
      {interest}
    </div>
  );
}
