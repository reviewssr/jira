import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect, useState } from "react"
import qs from 'qs'
import { cleanObject } from 'utils/index'

const apiUrl = process.env.REACT_APP_API_URL   

export const ProjectListScreen = () => {
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const [ param, setParam ] = useState({
    name: '',
    personId: ''
  }) 

  useEffect(() => {
    console.log(111111111, param)
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
      if (response.ok) {
        setList(await response.json()) 
      }
    })
  }, [param])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json()) 
      }
    })
  }, [])



  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} ></SearchPanel>
    <List users={users} list={list}></List>
  </div>
}