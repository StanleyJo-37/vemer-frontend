import API from "./axios"

export interface ActivityBadgePayload{
    id: number,
    name: string,
    description: string
    image:string
}

export interface ActivityPopupPayload{
    Title:string,
    description: string
}

export interface ActivityPayload{
    id: number,
    name: string,
    description: string,
    activity_type: 'event'|'volunteer',
    start_date: Date,
    end_date:Date,
    status:boolean,
    location:string,
    image:string,
    category:string,
    points_reward:number,
    badges: ActivityBadgePayload,
    participant_count: number,
    slug: string,
    popup_info: ActivityPopupPayload
}

const ActivityAPI = {
    activity_detail: async(activity_id : number):Promise<{data :ActivityPayload}>=>{
        return API.PublicAPI.request({
            url:"/activities/" + activity_id,
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