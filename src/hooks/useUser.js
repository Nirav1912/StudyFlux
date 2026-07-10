import {useAuth} from "../context/AuthContext"

export default function useUser(){

const {user}=useAuth()

return user

}