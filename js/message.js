!function(){
    var model = {
        // 获取数据
        init: function(){
            var APP_ID = 'QFmakkgH3pvCMw8D9VmbQsHp-gzGzoHsz';
            var APP_KEY = 'uUpv4k2FhsnHqCnQ38W7Qp0D';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch: function(){
            var query = new AV.Query('Message');
            return query.find()
        },

        save: function(name, content,time){
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                'name': name,
                'content': content,
                'time':time
            })
        }
    }

    var view = document.querySelector('section.message')


    var controller = {
        view: null,
        model: null,
        messageList: null,

        init: function(view, model){
            this.view = view
            this.model = model

            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.init()

            this.loadMessages()
            this.bindEvents()


        },
        loadMessages: function(){
            this.model.fetch().then(
                (messages) => {
                    let array = messages.map((item)=> item.attributes )
                    array.forEach((item)=>{

                        let li = document.createElement('li')
                        li.className = 'message-li'
                        li.innerText = `${item.name}: ${item.content}`

                        this.messageList.appendChild(li)

                        let a = document.createElement('span')

                        a.innerText = `${item.time}`;

                        li.appendChild(a)

                    })
                }
            )
        },



        bindEvents: function(){

            this.form.addEventListener('submit', e =>  {

                e.preventDefault()

                this.saveMessage()



            })
        },
        saveMessage: function(){
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            let time = new Date().toLocaleString()
            this.model.save(name, content,time).then(function(object) {

                let li = document.createElement('li')
                li.className = 'message-li'
                li.innerText = `${object.attributes.name}: ${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
                let a = document.createElement('span')
                console.log(1)


                a.innerText = `${object.attributes.time}`;

                li.appendChild(a)



                myForm.querySelector('input[name=content]').value = ''




            })
        }

    }

    controller.init(view, model)


}.call()
/*
*/