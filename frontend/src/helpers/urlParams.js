
export default function urlParams() {

  const url_string = window.location.href;
	const url = new URL(url_string);
	const url_invite = url.searchParams.get("i");
	const url_dashbaord = url.searchParams.get("d");
  const url_email = url.searchParams.get("e");
  window.history.replaceState({}, document.title, "/" + "");
 
  if (url_invite){

    const invite = {
      id: url_dashbaord,
      email: url_email
    }
   
    return invite;
  } 

  return false;

  }






