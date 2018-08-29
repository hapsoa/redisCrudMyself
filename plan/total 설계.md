
express 와 babel을 설정한다.

pug를 만들 수 있도록 한다.

DB : redis database 관련 코드. dbManager

api server : 

web api

ui : uiManager



api server와 web api의 차이는?

하나는 $.post() 하는 곳이고,

하나는 router.get() 하는 곳이다.


<- uiManager ->
search, add, delete, edit 를 누르면 작동하는 모듈

    searchSubmitButton
    addSubmitButton
    deleteSubmitButton
    editSubmitButton

<- webApi ->
서버에 데이터를 요청하는 모듈

    searchStudent()
    addStudent()
    deleteStudent()
    editStudent()

<- apiServer ->
데이터를 제공하는 모듈

    router

    router.get()
    router.post()
    router.delete()
    router.put()

<- databaseApi ->
데이터베이스를 관리하는 모듈

    client

    client.get()
    client.del()
    client.set()


