import firebase from "./firebase"

export default {
  methods: {
    getUserInfoFromUserId(uid) {
      return new Promise((resolve, reject) => {
        firebase.firestore().collection('users')
          .doc(uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              resolve(doc.data())
            } else {
              reject('idに対応するユーザーが見つかりませんでした')
            }
          })
      })
    }
  }
}