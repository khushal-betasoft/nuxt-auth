import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {

    async login(endpoint, reset = true) {
        //     // Token is required but not available
        // User endpoint is disabled.
        if (this.options.endpoints.token) {
            endpoint.data.token = this.options.token
        }
        if (this.options.grantType) {
            endpoint.data.grant_type = this.options.grantType
        }
        if (this.options.scope) {
            endpoint.data.scope = this.options.scope
        }
        if (this.options.endpoints.logout) {
            this.$auth.reset()
        }
        try {
            const response = await this.$auth.request(
                endpoint,
                this.options.endpoints.login
            )
            console.log("Auth:", response)
            if (response.data.data.is_2FA_enabled === true && !response.data.data.id) {
                return response;
            }

            // Update tokens
            this.updateTokens(response)

            // Initialize request interceptor if not initialized
            if (!this.requestHandler.interceptor) {
                this.initializeRequestInterceptor()
            }

            // Fetch user if `autoFetch` is enabled
            if (this.options.user.autoFetch) {
                await this.fetchUser()
            }
            return response
        }
        catch (err) {
            console.log("error=> ", err);
        }
    }

}