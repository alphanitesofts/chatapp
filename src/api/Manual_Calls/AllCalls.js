async function getRecentChat(id) {
    try {
        const formdata = new FormData();
        formdata.append("user_id", id);

        const requestOptions = {
            method: "POST",
            body: formdata,
            redirect: "follow"
        };

        const response = await fetch("https://chatapp.alphanitesofts.net/api/getLastMessages", requestOptions);
        const result = await response.json();
        return result; // Return the result
    } catch (error) {
        console.error(error); // Log the error if any
        throw error; // Throw the error to handle it elsewhere
    }
}

async function fetchContactsNotInGroup(userId, groupId) {
    try {
      const formdata = new FormData();
      formdata.append("user_id", userId);
      formdata.append("group_id", groupId);
  
      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };
  
      const response = await fetch("https://chatapp.alphanitesofts.net/api/fetch_contacts_not_in_group", requestOptions);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      return { error: error.message };
    }
  }

export { getRecentChat ,fetchContactsNotInGroup};
