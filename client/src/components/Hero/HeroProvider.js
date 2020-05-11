import React from "react";

let HeroProvider = React.createContext({
	id: 0,
	changeCountry: (newId) => {
		console.log(newId)
	}
});

// You can also import and use it like that
// export const { Provider, Consumer } = ToastProvider;

export default HeroProvider;
