import type { JSX } from "react";

/**
 * A simple loading spinner component with an optional message.
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.message='Loading...'] - Optional message displayed below the spinner
 * @returns {JSX.Element} A centered spinner with a message
 */
const Loading = ({ message = 'Loading...' }: { message?: string }): JSX.Element => {
	return (
		<div className="flex flex-col items-center justify-center gap-2 w-full py-8 text-gray-500">
			<div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
			<p className="text-sm">{message}</p>
		</div>
	);
};

export default Loading;