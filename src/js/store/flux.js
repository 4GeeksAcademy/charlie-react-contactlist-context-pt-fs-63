const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getAllAgendas: async () => {
				const agendasReq = await fetch(`https://playground.4geeks.com/contact/agendas`, {
					headers: {
						"Content-Type": "application/json"
					}
				});
				const agendasJson = await agendasReq.json(); // Parse the JSON response
				setStore({ agendas: agendasJson }); // Set the store with the parsed JSON

				console.log(getStore());
				return agendasJson
			},
			getSlugAgenda: async (slug) => {
				const slugReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
					headers: {
						"Content-Type": "application/json"
					}
				});
				const slugJson = await slugReq.json()
				setStore({ slug: slugJson })
				//console.log(slugJson)
				return slugJson
			},
			createSlugAgenda: async (slug) => {
				const createSlugReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					}
				}).then(res => {
					if (!res.ok) {
						alert("Something Went Wrong")
					}
				})
				const createSlugJson = await createSlugReq.json()
				setStore({ ...agendas, slug: createSlugJson })
				getActions().getAllAgendas()
				return createSlugJson
			},
			deleteSlugAgenda: async (slug) => {
				const deleteSlugReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				}).then(res => {
					if (!res.ok) {
						alert("Something Went Wrong")
					}
				});
				const deleteSlugJson = await deleteSlugReq.json()
				setStore({ ...agendas, slug: deleteSlugJson })
			},
			getContacts: async (slug) => {
				const getContactsReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`,{
					headers: {
						"Content-Type": "application/json"
					}
				}).then(res => {
					if (!res.ok) {
						alert("Something Went Wrong")
					}
				});
				const getContactsJson = await getContactsReq.json()
				setStore({ ...agendas, contacts: getContactsJson})
			},
			createContact: async (slug) => {
				const createContactReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`,{
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: {
						"name": "string",
						"phone": "",
						"email": "",
						"address": ""
					}
				}).then(res => {
					if (!res.ok) {
						alert("Something Went Wrong")
					}
				});
				const createContactJson = await createContactReq.json()
				setStore({ ...agendas, contacts: createContactJson})
			},
			getRandomNumber: () => {
				return Math.floor(Math.random() * 100000)
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
