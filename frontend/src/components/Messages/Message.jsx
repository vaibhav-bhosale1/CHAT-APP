import { useAuthContext } from "../../context/authcontext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	
	// Generate a default Robohash URL if no profilePic is available
	const getAvatarUrl = (id) => `https://robohash.org/${id}?set=set4`;

	const profilePic = fromMe
		? authUser.profilePic || getAvatarUrl(authUser._id)
		: selectedConversation?.profilePic || getAvatarUrl(message.senderId);

	const bubbleBgColor = fromMe ? "bg-blue-500" : "";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='User Avatar' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
				{message.message}
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
				{formattedTime}
			</div>
		</div>
	);
};

export default Message;
