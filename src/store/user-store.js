import { defineStore } from 'pinia'
import axios from 'axios'
import { v4 as uuid } from 'uuid';
import { 
  collection, 
  onSnapshot, 
  where, 
  query, 
  doc, 
  setDoc, 
  getDoc, 
  deleteDoc, 
  orderBy
} from "firebase/firestore";
import { db } from '@/firebase-init'
import moment from 'moment'

axios.defaults.baseURL = 'http://localhost:4001/'

export const useUserStore = defineStore('user', {
  state: () => ({
    sub: '',
    email: '',
    picture: '',
    firstName: '',
    lastName: '',
    emails: []
  }),
  actions: {
    async getUserDetailsFromGoogle(data) {
        let res = await axios.post('api/google-login', {
            token: data.credential
        })

        this.$state.sub = res.data.sub
        this.$state.email = res.data.email
        this.$state.picture = res.data.picture
        this.$state.firstName = res.data.given_name
        this.$state.lastName = res.data.family_name
        this.$state.lastName = res.data.family_name
    },

    getEmailsByEmailAddress() {

      const q = query(collection(db, "emails"), where("toEmail", "==", this.$state.email), orderBy("createdAt", "desc"));

      onSnapshot(q, 
        (querySnapshot) => {

          let resultArray = []
          querySnapshot.forEach((doc) => {
            resultArray.push({
                id: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                fromEmail: doc.data().email,
                toEmail: doc.data().toEmail,
                subject: doc.data().subject,
                body: doc.data().body,
                hasViewed: doc.data().hasViewed,
                createdAt: moment(doc.data().createdAt).format("MMM D HH:mm")
              })
          });
        this.$state.emails = resultArray
      }
      ,(error) => {
        console.log(error)
      })
    },

    async getEmailById(id) {

      const docRef = doc(db, "emails", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: id,
          body: docSnap.data().body,
          createdAt: moment(docSnap.data().createdAt).format("MMM D HH:mm"),
          firstName: docSnap.data().firstName,
          fromEmail: docSnap.data().fromEmail,
          lastName: docSnap.data().lastName,
          subject: docSnap.data().subject,
          toEmail: docSnap.data().toEmail,
          hasViewed: docSnap.data().hasViewed,
        }
      } else {
        console.log("No such document!");
      }
    },

    async sendEmail(data) {
      try {
        await setDoc(doc(db, "emails/" + uuid()), {
          firstName: this.$state.firstName,
          lastName: this.$state.lastName,
          fromEmail: this.$state.email,
          toEmail: data.toEmail,
          subject: data.subject,
          body: data.body,
          hasViewed: false,
          createdAt: Date.now()
        });
      } catch (error) {
        console.log(error)
      }
    },

    async emailHasBeenViewed(id) {
      try {
        await setDoc(doc(db, "emails/" + id), {
          hasViewed: true,
        }, { merge: true });
      } catch (error) {
        console.log(error)
      }
    },

    async deleteEmail(id) {
      try {
        await deleteDoc(doc(db, "emails", id));
      } catch (error) {
        console.log(error)
      }
    },

    clearUser() {
        this.$state.firstName = ''
        this.$state.lastName = ''
        this.$state.email = ''
        this.$state.picture = ''
        this.$state.sub = ''
        this.$state.emails = []
    }
  },
  persist: true
})