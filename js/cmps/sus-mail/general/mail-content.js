export default {
    template: `
        <section class="mail-content">
            <div class="mail-content-header">
                <slot name="header">
                </slot>
            </div>

            <div class="mail-content-main">
                <slot name="main"></slot>
            </div>

            <div v-if="$slots.footer" 
                 class="mail-content-footer">
                <slot name="footer" ></slot>
            </div>
        </section>
    `
}