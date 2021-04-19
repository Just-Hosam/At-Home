
export default function urlParams() {

  const url_string = window.location.href;
	const url = new URL(url_string);
	const url_invite = url.searchParams.get("i");
	const url_dashbaord = url.searchParams.get("d");
  window.history.replaceState({}, document.title, "/" + "");
 
  if (url_invite){
   
    return url_dashbaord;
  } 

  return false;

  }




