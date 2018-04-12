export default {
    template: `
        <section class="side-menu">
            <router-link to="sus-mail/new-mail" class="new-mail-btn">        
                new letter
            </router-link>
            <ul class="clean-list">
                <router-link to="sus-mail">
                    <li>Inbox<span></span></li>
                </router-link>
            </ul>
        </section>
    `
}