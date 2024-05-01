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
			///////////////////////////////////////////////////////
			getAllAgendas: async () => {
				const agendasReq = await fetch(`https://playground.4geeks.com/contact/agendas`, {
					headers: {
						"Content-Type": "application/json"
					}
				});
				const agendasJson = await agendasReq.json(); // Parse the JSON response
				setStore({ agendas: agendasJson.agendas }); // Set the store with the parsed JSON

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

				return slugJson
			},
			createSlugAgenda: async (slug) => {
				const createSlugReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					}
				})
				if (!createSlugReq) {
					alert("Something Went Wrong")
				}
				const createSlugJson = await createSlugReq.json()
				setStore({ ...getStore().agendas, slug: createSlugJson })
				getActions().getAllAgendas()
				return createSlugJson
			},
			deleteSlugAgenda: async (slug) => {
				const deleteSlugReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					}
				});
				if (!deleteSlugReq.ok) {
					alert("Something Went Wrong")
				};
				setStore({ ...getStore().agendas })
			},
			///////////////////////////////////////////////////////
			getContacts: async (slug) => {
				const getContactsReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
					headers: {
						"Content-Type": "application/json"
					}
				})
				if (!getContactsReq.ok) {
					alert("Something Went Wrong")
				};
				const getContactsJson = await getContactsReq.json()
				setStore({ ...getStore().agendas, contacts: getContactsJson.contacts })
			},
			createContact: async (slug, body) => {
				const createContactReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					//IMPORTANT TO FORMAT
					body: JSON.stringify(body)
				});
				if (!createContactReq.ok) {
					alert("Something Went Wrong")
				}
				const createContactJson = await createContactReq.json()
				setStore({ ...getStore().contacts, contacts: createContactJson.contacts })
				getActions().getContacts(slug)
				return createContactJson
			},
			deleteContact: async (slug, id) => {
				const deleteContactReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json"
					},
				});
				if (!deleteContactReq.ok) {
					alert("Something Went Wrong")
				} else console.log("Deleted Contact")

				getActions().getContacts(slug)
			},
			updateContact: async (slug, id) => {
				const updateContactReq = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}/contacts/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
				});
				if (!updateContactReq.ok) {
					alert("Something Went Wrong")
				} else console.log("Updated Contact")

				// const updateContactJson = await updateContactReq.json()
				// setStore({ ...getStore().contacts, contacts: updateContactJson.contacts })
				getActions().getContacts(slug)
			},
			///////////////////////////////////////////////////////
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
