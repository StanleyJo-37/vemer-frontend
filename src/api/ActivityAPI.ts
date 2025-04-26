import API from "./axios"

const ActivityAPI = {
    activity_detail: async(acitivity_id : number)=>{
        return API.AuthenticatedAPI.request({
            url:"/activity/" + acitivity_id,
            method: 'GET' 
        })
    }
}

export default ActivityAPI;