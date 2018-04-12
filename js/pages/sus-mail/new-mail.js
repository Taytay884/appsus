import eventBusService from "../../services/event-bus.service.js";

export default {
    template: `
        <section class="new-mail">
            <form>
                <label for="send-to" hidden></label>
                <input id="send-to" value="this@susmail.com" type="text" disabled />

                <label for="title" hidden></label>                
                <input id="title" v-model="mailValues.title" type="text" />

                <textarea v-model="mailValues.content"></textarea>
            </form>
            <div class="footer-container">
                <div class="text-tools">
                    <button>A^</button>
                    <button>A></button>
                </div>
                <button class="send-btn" @click="emitMailData()">send</button>
            </div> 
        </section>
    `,
    data() {
        return {
            mailValues: {
                title: 'title',
                content: 'content'
            }
        }
    },
    methods: {
        emitMailData() {
            console.log('sending mail');
            eventBusService.$emit('mail-sent', this.mailValues);
            this.$router.push('/sus-mail');
        }
    }
}