import eventBusService, { EVENTS } from "../../../services/event-bus.service.js";
import mailContent from '../../../cmps/sus-mail/general/mail-content.js'

export default {
    template: `
        <section class="new-mail">
            <mail-content>
                <template slot="header">
                    <router-link to="/sus-mail/">
                        <button class="clean-btn fas fa-arrow-left"></button>
                    </router-link>
                    <h3>New Mail</h3>
                </template>

                <template slot="main">
                    <form class="mail-form">
                        <div class="main-section-container to-container">
                            <label for="send-to" hidden></label>
                            <span>to</span>
                            <input id="send-to" value="this@susmail.com" type="text" disabled />
                        </div>
        
                        <div class="main-section-container title-container">
                            <label for="title" hidden></label>                
                            <input id="title" placeholder="Mail subject" v-model="mailValues.title" type="text" />
                        </div>
        
                        <div class="main-section-container msg-container">
                            <textarea v-model="mailValues.content" placeholder="What are you saying?"></textarea>
                        </div>
                    </form>
                </template>

                <template slot="footer">
                    <div class="new-mail-footer" >
                        <router-link @click.native="emitMailData()"
                                    to="/sus-mail" 
                                    class="send-btn">        
                                send
                        </router-link>
                    </div>    
                </template>
            </mail-content>
        </section>
    `,
    data() {
        return {
            mailValues: {
                title: null,
                content: null
            }
        }
    },
    methods: {
        emitMailData() {
            eventBusService.$emit(EVENTS.MAIL_SENT, this.mailValues);
            this.$router.push('/sus-mail');
        }
    },
    components: {
        mailContent
    }
}