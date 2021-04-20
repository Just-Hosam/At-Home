import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function useMailer() {

  const [cookies] = useCookies(null);
  const sendInvite = recipient => {

  const user = cookies.userData;
   
  const details = {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            recipient: recipient
          }

			axios.post(`/dashboards/${user.id}/send-mail`, {details})
			.then((res) => {
    
      if(res.status === 200){
        alert(`Invite sent to ${recipient}`);  // <-- TODO: handle UI
      } else {
        alert(`FAILED to send invite to ${recipient}`);  // <-- TODO: handle UI
      }

			}).catch((err) => console.log(err));

	};

  return {sendInvite};
}