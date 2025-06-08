import API from "./axios"

const ActivityAPI = {
    activity_detail: async(activity_id : number)=>{
        return API.AuthenticatedAPI.request({
            url:"/activity/" + activity_id,
            method: 'GET' 
        })
    },

    enroll: async(activity_id: number) => {
        return API.AuthenticatedAPI.request({
            url: "/activities/" + activity_id + "/enroll",
            method: 'POST',
        })
    },

    getStatus : async(activity_id:number)=>{
        return API.AuthenticatedAPI.request({
            url: "/activities/" + activity_id + "/get-status",
            method: 'GET'
        })
    }
}

export default ActivityAPI;