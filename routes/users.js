//express 모듈 세팅
const express = require('express')
const router = express.Router()  //app.js에 활용
const conn = require('../mariadb')

// A simple SELECT query
conn.query(
    'SELECT * FROM `users`',
    function(err, results, fields) {

    }

);


router.use(express.json()) // http 외 모듈 json

let db = new Map()  //디비 값 1부터 시작
var id = 1 // 하나의 객체를 유니크하게 구별하기 위함

// 로그인
router.post('/login', function(req,res){
    console.log(req.body) // userId pwd body로 받아 

    // userId가 디비에 저장된 회원인지?
    const {userId, password} = req.body
    var loginUser = {}

    db.forEach(function(user, id) {
        if (user.userId === userId) {
            loginUser = user // 로그인 유저에 객체 담고
        }
    })

    if (Object.keys(loginUser). length === 1) {
        console.log("같아")

         //pwd도 맞는지 비교
         if (user.password === password) {
            console.log("패스워드도 같아")
        } else {
            console.log("패스워드는 틀렸다.")
        }
    } else {
        console.log("입력하신 아이디는 없는 아이디입니다.")
    }

    // id가 디비에 저장된 회원인지 확인해야..
    // pwd도 맞는지 비교
})

// 회원 가입
router.post('/join', function(req,res){
    console.log(req.body)

 // 빈 객체 체크 (입력값이 없는 경우)
 if (Object.keys(req.body).length === 0) {
    res.status(400).json({
        message: '입력 값을 다시 확인해주세요.'
    });
    return;  // 중복 응답 방지
}

db.set(id++, req.body)

res.status(201).json({
    message : `${db.get(id-1).name}님 환영합니다.`
}) // 201 은 생성되었다는 의미 
})


// 회원 개별 조회
router.get('/users/:id', function(req,res){
    let {id} = req. params
    id = parseInt(id)

    const user = db.get(id)
    if (user == undefined) {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })

    } else {
        res.status(200).json({
            userId : user.userId,
            name : user.name
        })
    }
    
})

// 회원 개별 탈퇴
router.delete('/users/:id', function(req,res){
    let {id} = req. params
    id = parseInt(id)

    const user = db.get(id)
    if (user == undefined) {
        res.status(404).json({
            message : "회원 정보가 없습니다."
        })

    } else {
        db.delete(id)

        res.status(200).json({
            message : `${user.name}님 다음에 또 뵙겠습니다.`
        })
    }
    
    
})

module.exports = router 