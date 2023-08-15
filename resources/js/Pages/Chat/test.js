export default {
    data:function(){
        return {
            chatRooms:[],
            currentRoom:[],
            messages:[]
        }
    },
    methods:{
        getRooms(){
            axios.get('/chat/rooms')
                .then(response=>{
                    this.chatRooms = response.data;
                    this.setRoom(response.data[0]);
                })
                .catch(error=>{
                    console.log(error);
                })
        }
        setRoom(room){
            this.currentRoom = room;
        }
    },
    created(){
        this.getRooms();
    }
}
