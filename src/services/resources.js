import Vue from 'vue';
import VueResource from 'vue-resource';
// import AxiosPlugin from 'axios';
 
// Vue.use(AxiosPlugin)

// var cors = require('cors')
// Vue.use(cors);

Vue.use(VueResource);


require('./interceptors');

export class Jwt{

    static accessToken(email, password){
        return Vue.http.post('http://localhost:3000/auth', {
            email,
            password
        });
    }

    static refreshToken(){
        return Vue.http.post('http://localhost:3000/api/refresh_token');
    }
    
}
export class Criarlivro{

    static criarlivro(name, author, description){
        return Vue.http.post('http://localhost:3000/livros', {
            name,
            author,
            description
        });
    }
    
}
export class Criarautor{

    static criarautor(name, description){
        return Vue.http.post('http://localhost:3000/autores', {
            name,
            description
        });
    }
    
}


// const Time = Vue.resource('http://localhost:3000/api/times');
// const Livroaut = Vue.resource(`http://localhost:3000/livros/?author={author}`);
// const Livroid = Vue.resource(`http://localhost:3000/livros{/id}`);

const User = Vue.resource('http://localhost:3000/users?email={email}');
const Deptos = Vue.resource(`http://localhost:3000/depts`);
const Categories = Vue.resource(`http://localhost:3000/categories`);
const Ideas = Vue.resource(`http://localhost:3000/ideas`);
const Missions = Vue.resource(`http://localhost:3000/missions`);
const Comments = Vue.resource(`http://localhost:3000/comments`)

const Userid = Vue.resource(`http://localhost:3000/users{/id}`);
const Deptosid = Vue.resource(`http://localhost:3000/depts{/id}?search={search}&page={page}`);
const Catid = Vue.resource(`http://localhost:3000/categories{/id}?search={search}&page={page}`);
const Ideid = Vue.resource(`http://localhost:3000/ideas{/id}`);
const Missionid = Vue.resource(`http://localhost:3000/missions{/id}`);

const Idemis = Vue.resource(`http://localhost:3000/ideas/?mission_id={id}`);
const Idcom = Vue.resource(`http://localhost:3000/comments?idea_id={id}`);
const Userdept = Vue.resource(`http://localhost:3000/users?dept_id={dept_id}&search={search}&page={page}`);
const Idecat = Vue.resource(`http://localhost:3000/ideas?category_id={category_id}&mission_id={mission_id}&search={search}&page={page}`);
const Resetpassword = Vue.resource(`http://localhost:3000/reset_password?email={email}`);
const Idept = Vue.resource(`http://localhost:3000/missions?dept_id={dept_id}&search={search}&page={page}`);
const IdeaFile = Vue.resource(`http://localhost:3000/idea_files?idea_id={idea_id}`);
const Razaos = Vue.resource(`http://localhost:3000/razaos?ies_status={ies_status}`);
const Campos = Vue.resource(`http://localhost:3000/campos?mission_id={mission_id}`);
const MissionsDepts = Vue.resource(`http://localhost:3000/mission_deptos?mission_id={mission_id}&dept_id={dept_id}`);





export {Campos, MissionsDepts, User, Razaos, Deptos, Userid, Categories, Deptosid, Ideas, Catid, Missions, Comments, Ideid, Missionid, Idemis, Idcom, Userdept, Idecat, Idept, Resetpassword, IdeaFile};

