export function handler(event, context, callback) {
    const { identity, user } = context.clientContext || {}

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            msg: {
                context: context.clientContext,
                identity: identity,
                user: user,
                firebase: process.env.FIREBASE_SECRET
            }
        })
    })
}