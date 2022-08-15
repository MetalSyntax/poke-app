import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

/**
 * It takes a message prop and returns a div with a FontAwesome icon and the message
 * @param  - { message: string }
 * @returns A React component that displays an error message.
 */
export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="error-message" data-testid="error">
      <FontAwesomeIcon icon={faExclamationCircle} size="2x" />
      {message}
    </div>
  );
}
