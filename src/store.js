import Vue from 'vue';
import Vuex from 'vuex';
import {DeptosModel} from './deptos-model';
import {UsersModel} from './users-model';
import {CategoriesModel} from './categories-model';
import {IdeasModel} from './ideas-model';
import JwtToken from './services/jwt-token';
import {Deptos, User, Categories, Userid, Ideas} from './services/resources';
import SessionStorage from './services/session-storage';


Vue.use(Vuex);


const state = {
    depts: [],
    categories: [],
    users: [],
    ideas: [],
    auth: {
        check: JwtToken.token != null,
        user: SessionStorage.getObject('user')
    },
    
};

const mutations = {
    'set-categories'(state, categories){
        state.categories = categories;
        // console.log(state.livros);
    },
    'set-deptos'(state, depts){
        state.depts = depts;
        // console.log(state.depts);
    },
    'set-users'(state, user){
        state.users = user;
        // console.log(state.users);
    },
    'set-ideas'(state, ideas){
        state.ideas = ideas;
        // console.log(state.users);
    },
    update(state, time){
        let index = state.times.findIndex(element => time.id == element.id);
        if (index != -1) {
            state.times[index] = time;
        }
    },
    setUser(state,user){
        SessionStorage.setObject('user', user);
        state.auth.user = user;
    },
    authenticated(state){
        state.auth.check = true;
    },
    unauthenticated(state){
        state.auth.check = false;
        state.auth.user = null;
        SessionStorage.remove('user');
        JwtToken.token = null;
    }
};

const actions = {
    'load-depts'(context){
        // if(filtro != 0){
            // Deptos.query({author: filtro}).then(response => {
            
            // var an_obj = response.data.data;
            //     // console.log(an_obj)
            // var responseobj = Object.values(an_obj);
            //     // console.log(responseobj)
            // let livros = responseobj.map(element => new LivrosModel(element.id, element.name, element.author, element.description));  
            // context.commit('set-livros', livros);
            
            // });
        // }else {
            Deptos.query().then(response => {
                var an_obj = response.data;
                // console.log(an_obj)
                    // console.log(an_obj)
                var responseobj = Object.values(an_obj);
                    // console.log(responseobj)
                let depts = responseobj.map(element => new DeptosModel(element.id, element.dep_name, element.created_at));  
                
                context.commit('set-deptos', depts);
            
            });
        // }
    },
    'load-categories'(context){
        Categories.query().then(response => {
                var an_obj = response.data;
                // console.log(an_obj)
                    // console.log(an_obj)
                var responseobj = Object.values(an_obj);
                    // console.log(responseobj)
                let categories = responseobj.map(element => new CategoriesModel(element.id, element.cat_name, element.created_at));  
                context.commit('set-categories', categories);
            
            });
        // }
    },

    'load-ideas'(context){
        Ideas.query().then(response => {
                var an_obj = response.data;
                // console.log(an_obj)
                    // console.log(an_obj)
                var responseobj = Object.values(an_obj);
                    // console.log(responseobj)
                let ideas = responseobj.map(element => new IdeasModel(element.id, element.idea_name, element.idea_description, element.user, element.category, element.mission));  
                context.commit('set-ideas', ideas);
            
            });
        // }
    },
    'load-users'(context){
        // if(filtro != 0){
            // Deptos.query({author: filtro}).then(response => {
            
            // var an_obj = response.data.data;
            //     // console.log(an_obj)
            // var responseobj = Object.values(an_obj);
            //     // console.log(responseobj)
            // let livros = responseobj.map(element => new LivrosModel(element.id, element.name, element.author, element.description));  
            // context.commit('set-livros', livros);
            
            // });
        // }else {
            User.query().then(response => {
                var response = response.data;
                // console.log(response)
                var responseinobj = Object.values(response);
                    
                let user = responseinobj.map(element => new UsersModel(element.id, element.dept, element.username, element.email, element.user_name, element.user_phone, element.dept_id));  
                // console.log('load', user)
                context.commit('set-users', user);
            
            });
        // }
    },


    login(context, {email, password_digest}){
        // console.log(email, password_digest)
        
        return JwtToken.accessToken(email, password_digest)
            .then(response => {
                context.commit('authenticated');
                // context.dispatch('getUser', response.data.id);

                return response;
        })
    },


    getUser(context, user_id){
        console.log('getUser', Userid);
        Userid.query({id: user_id}).then(response => {
            context.commit('setUser', response.data);
        })
    },


    saveuser(context, user){
        User.save({user: user}).then(response => {
            console.log('Cadastro feito com sucesso!')
            // success callback
        }, response => {    
            // error callback
            alert('erro no cadastro');
        });
    },

    
    savecat(context, category){
        Categories.save({category: category}).then(response => {
            console.log('Cadastro feito com sucesso!')
            // success callback
            console.log(response.data)
        }, response => {    
            // error callback
            console.log('erro no cadastro')
        });
    },

    savedep(context, dept){
        Deptos.save({dept: dept}).then(response => {
            console.log('Cadastro feito com sucesso!')
            // success callback
            console.log(response.data)
        }, response => {    
            // error callback
            console.log('erro no cadastro')
        });
    },
    
    
};

export default new Vuex.Store({
    state,
    getters: {
        timesLibertadores: state => state.times.slice(0, 6),
        timesRebaixados: state => state.times.slice(16, 20),
    },
    mutations,
    actions
});