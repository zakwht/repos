export const TopicButton = ({
  name,
  onClick
}: {
  name: React.ReactNode;
  onClick: () => void;
}) => (
  <span role="button" onClick={onClick} className="topic-button">
    {name}
  </span>
);

export const LangButton = ({
  name,
  color,
  onClick
}: {
  name: string;
  color: string;
  onClick: () => void;
}) => (
  <span
    role="button"
    onClick={onClick}
    className="lang-button flex-center link"
  >
    <div style={{ backgroundColor: color }} />
    <span>{name}</span>
  </span>
);
