import navbar from '../../cmps/general/navbar.js'

export default {
    template: `
        <section class="home">
            <header>
                <navbar title="Appsus">
                    <ul class="navbar-links clean-list">
                        <li>about</li>
                        <li>products</li>
                    </ul>
                </navbar>
            </header>
        </section>
    `,
    components: {
        navbar
    }
}