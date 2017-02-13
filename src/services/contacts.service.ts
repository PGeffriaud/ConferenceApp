import {Injectable} from '@angular/core'
import { Contacts, Contact, ContactField, ContactName, ContactOrganization, ContactFieldType, ContactFindOptions} from 'ionic-native';
import { Speaker } from '../types/Speaker'

@Injectable()

export class ContactService {


  constructor() {}

  saveContact(speaker: Speaker): Promise<any> {
      let contact: Contact = Contacts.create()

      contact.name = new ContactName(null, speaker.lastname, speaker.firstname)
      contact.displayName = speaker.firstname + ' ' + speaker.lastname
      contact.nickname = speaker.id
      contact.urls = []

      speaker.socials.forEach(social => {
        contact.urls.push(new ContactField(social.class, social.link))
      })

      contact.note = speaker.about
      contact.organizations = []
      contact.organizations.push(new ContactOrganization('company', speaker.company))

      return contact.save()
  }

  // Find the contact associated to the speaker (find by id)
  findInContacts(speaker: Speaker): Promise<Contact[]> {
    let fields: ContactFieldType[] = ['nickname']
    let options = new ContactFindOptions()
    options.filter = speaker.id

    return Contacts.find(fields, options)
  }

  removeContactIfExist(speaker: Speaker): Promise<any> {
      return this.findInContacts(speaker).then(contacts => {
        let requests = contacts.map(contact => contact.remove())
        return Promise.all(requests)
      })
    }

}
