# Ticket Project API Dokumentation

Diese Dokumentation bietet eine Übersicht über die Endpunkte, die in der Ticket Project API zur Verfügung stehen. Jeder Endpunkt hat eine kurze Beschreibung, die angibt, welche Aktion er ausführt, welche Anforderungen er stellt und ein Beispiel.

## Inhaltsverzeichnis

- [Allgemeine Information](#allgemeine-information)
- [Authentifizierung](#authentifizierung)
- [API Endpunkte](#api-endpunkte)
   - [Auth Endpunkte](#auth-endpunkte)
      - [POST /api/auth/register](#post-apiauthregister)
      - [POST /api/auth/sendOtp](#post-apiauthsendOtp)
      - [POST /api/auth/verifyOtp](#post-apiauthverifyOtp)
  - [User Endpunkte](#user-endpunkte)
      - [GET /api/users/me](#get-apiusersme)
      - [PUT /api/users/me](#put-apiusersme)
      - [DELETE /api/users/me](#delete-apiusersme)
  - [Attorney Endpunkte](#attorney-endpunkte)
      - [GET /api/attorneys/me](#get-apiattorneysme)
      - [PUT /api/attorneys/me](#put-apiattorneysme)
      - [DELETE /api/attorneys/me](#delete-apiattorneysme)
  - [Ticket Endpunkte](#ticket-endpunkte)
      - [POST /api/tickets/](#post-apitickets)
      - [GET /api/tickets/open](#get-apiticketsopen)
      - [GET /api/tickets/user](#get-apiticketsuser)
      - [PUT /api/tickets/:ticketID/status](#put-apiticketsticketidstatus)
      - [DELETE /api/tickets/:ticketID](#delete-apiticketsticketid)
      - [GET /api/tickets/:ticketID](#get-apiticketsticketid)
      - [GET /api/tickets/:ticketID/images](#get-apiticketsticketidimages)
  - [Offer Endpunkte](#offer-endpunkte)
      - [GET /api/offers/tickets/:ticketID](#get-apioffersticketsticketid)
      - [GET /api/offers/attorney/me](#get-apioffersattorneyme)
      - [PUT /api/offers/:offerID/handle](#put-apioffersofferidhandle)
      - [PUT /api/offers/:offerID](#put-apioffersofferid)
      - [DELETE /api/offers/:offerID](#delete-apioffersofferid)

## Allgemeine Information

Diese API wurde entwickelt, um...

Basis-URL für alle API-Anfragen: `http://<host-url>/api`

## Authentifizierung

### Schritte zur Authentifizierung:

1. **Benutzerregistrierung und Telefonnummer-Verifizierung:**
- Der Benutzer registriert sich über den Endpunkt POST /api/auth/register mit einer Telefonnummer und weiteren erforderlichen Informationen.
- Bereits registrierte Nutzen den Endpunkt POST /api/auth/sendOtp mit ihrer registierten Telefonnummer.
- Die API verwendet Twilio, um ein One-Time Password (OTP) an die Telefonnummer des Benutzers zu senden.
- Der Benutzer sendet dieses OTP zurück an die API über den Endpunkt POST /api/auth/verifyOtp, um seine Telefonnummer zu verifizieren.

2. **Token-Erzeugung und -Verwendung:**
- Nach erfolgreicher Verifizierung der Telefonnummer generiert die API einen JWT, der die Identität des Benutzers repräsentiert.
- Dieser Token enthält eingebettete Benutzerinformationen und ist für eine bestimmte Zeit gültig, die durch das Feld expiresIn definiert ist.
- Der Token wird an den Client gesendet, der ihn bei jeder nachfolgenden Anfrage an geschützte Endpunkte im Authorization Header verwenden muss.

3. **Verwendung des Tokens:**
- Bei Anfragen an Endpunkte, die Authentifizierung erfordern, muss der Client den Token im Authorization Header der Anfrage einfügen.
- Das Format des Headers sollte wie folgt sein: `Authorization: Bearer <TOKEN>`.


## API Endpunkte

### Auth Endpunkte

#### POST /api/auth/register

Beschreibung:
- Dieser Endpunkt registriert einen neuen Benutzer oder Anwalt. Wenn die angegebene Telefonnummer noch nicht registriert ist, erstellt dieser Endpunkt einen neuen Eintrag in der Datenbank und sendet ein OTP (One-Time Password) zur Verifizierung an die angegebene Nummer. 

Request:

- **URL:** `/api/auth/register`
- **Methode:** `POST`
- **Body:**
  - `username`: String - Der Benutzername des neuen Benutzers oder Anwalts.
  - `phoneNumber`: String - Die Telefonnummer des Benutzers, an die das OTP gesendet werden soll.
  - `role`: String - Die Rolle des Kontos, das erstellt wird (entweder "user" oder "attorney").

Beispiel:

```json
{
  "username": "johndoe",
  "phoneNumber": "+1234567890",
  "role": "user"
}
```

#### POST /api/auth/sendOtp

Beschreibung:
- Kann zum Login genutzt werden. Sendet ein OTP an eine Telefonnummer. 

Request:

- **URL:** `/api/auth/sendOtp`
- **Method:** `POST`
- **Body:**
  - `phoneNumber`: String - Die Telefonnummer des Benutzers, an die das OTP gesendet werden soll.

Beispiel:

```json
{
  "phoneNumber": "+1234567890"
}
```

#### POST /api/auth/verifyOtp

Beschreibung:
- Dieser Endpunkt wird zur Überprüfung des vom Benutzer eingegebenen OTP (One-Time Password) verwendet. Wenn das OTP gültig ist, authentifiziert das System den Benutzer und gibt einen JWT (JSON Web Token) zurück.

Request:

- **URL:** `/api/auth/verifyOtp`
- **Methode:** `POST`
- **Body:**
  - `phoneNumber`: String - Die Telefonnummer des Benutzers, die zur Überprüfung des OTP verwendet wird.
  - `code`: String - Das vom Benutzer erhaltene OTP.

Beispiel:

```json
{
  "phoneNumber": "+1234567890",
  "code": "123456"
}
```

### User Endpunkte

#### GET /api/users/me

Beschreibung:
- Dieser Endpunkt ruft die Informationen des aktuell authentifizierten Benutzers ab.

Request:

- **URL:** `/api/users/me`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.

#### PUT /api/users/me

Beschreibung:
- Dieser Endpunkt ermöglicht es dem aktuell authentifizierten Benutzer, seine Informationen zu aktualisieren.

Request:

- **URL:** `/api/users/me`
- **Methode:** `PUT`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.
- **Body:** (Alle Felder sind optional, aber es muss mindestens eines angegeben werden)
  - `username`: String - Der neue Benutzername des Benutzers.
  - `phoneNumber`: String - Die neue Telefonnummer des Benutzers.

Beispiel:

```json
{
  "username": "neuerBenutzername",
  "phoneNumber": "+49123456789"
}
```

#### DELETE /api/users/me

Beschreibung:
- Dieser Endpunkt ermöglicht es dem aktuell authentifizierten Benutzer, sein Konto zu löschen. (Bisher nur möglich, wenn keine Tickets vorhanden sind, wegen Fremdkey)

Request:

- **URL:** `/api/users/me`
- **Methode:** `DELETE`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.


### Attorney Endpunkte

#### GET /api/attorneys/me

Beschreibung:
- Dieser Endpunkt ruft die Informationen des aktuell authentifizierten Anwalts ab.

Request:

- **URL:** `/api/attorneys/me`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.

#### PUT /api/attorneys/me

Beschreibung:
- Dieser Endpunkt ermöglicht es dem aktuell authentifizierten Benutzer, seine Informationen zu aktualisieren.

Request:

- **URL:** `/api/attorneys/me`
- **Methode:** `PUT`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.
- **Body:** (Alle Felder sind optional, aber es muss mindestens eines angegeben werden)
  - `username`: String - Der neue Benutzername des Benutzers.
  - `phoneNumber`: String - Die neue Telefonnummer des Benutzers.

Beispiel:

```json
{
  "username": "neuerBenutzername",
  "phoneNumber": "+49123456789"
}
```

#### DELETE /api/attorneys/me

Beschreibung:
- Dieser Endpunkt ermöglicht es dem aktuell authentifizierten Anwalt, sein Konto zu löschen. (Bisher nur möglich, wenn keine Offers vorhanden sind, wegen Fremdkey)

Request:

- **URL:** `/api/attorneys/me`
- **Methode:** `DELETE`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.


### Ticket Endpunkte

#### POST /api/tickets/

Beschreibung:
- Dieser Endpunkt wird verwendet, um ein neues Ticket zu erstellen. Der Benutzer muss authentifiziert sein und die Rolle "user" haben. Es werden auch Bilder unterstützt, die zusammen mit den Ticketdaten hochgeladen werden können.

Request:

- **URL:** `/api/tickets/`
- **Methode:** `POST`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Rolle "user" haben.
- **FormData-Parameter:**
  - `offense`: String - Die Beschreibung des Verstoßes.
  - `notePicture`: File (optional) - Bild der Notiz, falls vorhanden.
  - `ticketPicture`: File (optional) - Bild des Tickets, falls vorhanden.

Beispiel:

```
Form-Data:
offense: "parking"
notePicture: (File)
ticketPicture: (File)
```

#### GET /api/tickets/open

Beschreibung:
- Dieser Endpunkt dient zum Abrufen aller offenen Tickets. Nur Benutzer mit der Rolle "attorney" (Anwalt) haben Zugriff. Der Benutzer muss authentifiziert sein.

Request:

- **URL:** `/api/tickets/open`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Rolle "attorney" haben.

#### GET /api/tickets/user

Beschreibung:
- Dieser Endpunkt ermöglicht es, alle Tickets des authentifizierten Benutzers abzurufen. Der Zugriff ist auf den authentifizierten Benutzer beschränkt, der die Tickets erstellt hat.

Request:

- **URL:** `/api/tickets/user`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein.

#### PUT /api/tickets/:ticketID

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ersteller, ein bestimmtes Ticket zu aktualisieren. Es können neue Informationen zur Ordnungswidrigkeit und/oder neue Bilder hinzugefügt werden. Wenn neue Bilder hochgeladen werden, werden die alten Bilder aus dem Speicher gelöscht.

Request:

- **URL:** `/api/tickets/:ticketID`
- **Methode:** `PUT`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'ticketOwner' haben.
- **URL-Parameter:** 
  - `ticketID`: String - Die ID des zu aktualisierenden Tickets.
- **Body:** (multipart/form-data)
  - `offense`: String - Die Beschreibung der Ordnungswidrigkeit (optional).
  - `notePicture`: File - Das Bild der Notiz (optional).
  - `ticketPicture`: File - Das Bild des Tickets (optional).

Beispiel:
```
Form-Data:
offense: "speeding"
notePicture: (File)
ticketPicture: (File)
```

#### PUT /api/tickets/:ticketID/status

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ersteller, den Status eines bestimmten Tickets zu aktualisieren.

Request:

- **URL:** `/api/tickets/:ticketID/status`
- **Methode:** `PUT`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'ticketOwner' haben.
- **URL-Parameter:** 
  - `ticketID`: String - Die ID des Tickets, dessen Status aktualisiert werden soll.
- **Body:** (application/json)
  - `status`: String - Der neue Status des Tickets (erforderlich).

Beispiel:
```json
{
"status": "closed"
}
```

#### DELETE /api/tickets/:ticketID

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ersteller, ein bestimmtes Ticket zu löschen. Bei Erfolg werden auch alle zugehörigen Bilder aus dem S3-Speicher gelöscht.

Request:

- **URL:** `/api/tickets/:ticketID`
- **Methode:** `DELETE`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'ticketOwner' haben.
- **URL-Parameter:** 
  - `ticketID`: String - Die ID des Tickets, das gelöscht werden soll.

#### GET /api/tickets/:ticketID

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ersteller des Tickets und allen Anwälten, Details eines bestimmten Tickets abzurufen.

Request:

- **URL:** `/api/tickets/:ticketID`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'attorney' oder 'ticketOwner' haben.
- **URL-Parameter:** 
  - `ticketID`: String - Die ID des Tickets, das abgerufen werden soll.

#### GET /api/tickets/:ticketID/images

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ersteller des Tickets und allen Anwälten, die URLs der Bilder eines bestimmten Tickets abzurufen.

Request:

- **URL:** `/api/tickets/:ticketID/images`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'attorney' oder 'ticketOwner' haben.
- **URL-Parameter:** 
  - `ticketID`: String - Die ID des Tickets, dessen Bild-URLs abgerufen werden sollen.


### Offer Endpunkte

#### POST /api/offers

Beschreibung:
- Dieser Endpunkt ermöglicht es Anwälten, ein neues Angebot für ein spezifisches Ticket zu erstellen.

Request:

- **URL:** `/api/offers`
- **Methode:** `POST`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'attorney' haben.
- **Anfrage-Body:** 
  - `ticketID`: String (erforderlich) - Die ID des Tickets, für das das Angebot erstellt wird.
  - `attorneyID`: String (erforderlich) - Die ID des Anwalts, der das Angebot erstellt.
  - `price`: Dec(10,2) (erforderlich) - Der Preis des Angebots.
  - `description`: String (erforderlich) - Die Beschreibung des Angebots.

Beispiel:
```json
{
   "ticketID": "123",
   "attorneyID": "456",
   "price": 200,
   "description": "Komplette Vertretung im Verfahren."
}
```

#### GET /api/offers/tickets/:ticketID

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ticketinhaber, alle Angebote für ein spezifisches Ticket abzurufen.

Request:

- **URL:**: `/api/offers/tickets/:ticketID`
- **Methode:**: `GET`
- **Authentifizierung:**: Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'ticketOwner' haben.
- **URL-Parameter:** : 
  - `ticketID`: String - Die ID des Tickets, für das die Angebote abgerufen werden sollen.

#### GET /api/offers/attorney/me

Beschreibung:
- Dieser Endpunkt ermöglicht es Anwälten, alle von ihnen erstellten Angebote abzurufen.

Request:

- **URL:** `/api/offers/attorney/me`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'attorney' haben.

#### PUT /api/offers/:offerID/handle

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ticketbesitzer, ein Angebot anzunehmen oder abzulehnen.

Request:

- **URL:** `/api/offers/:offerID/handle`
- **Methode:** `PUT`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'ticketOwner' haben.
- **URL-Parameter:** 
  - `offerID`: String - Die ID des Angebots, das bearbeitet werden soll.
- **Anfrage-Body:** 
  - `action`: String - Die Aktion, die auf das Angebot angewendet werden soll ('accept' oder 'reject').

```json
{
   "action": "accept"
}
```

#### PUT /api/offers/:offerID

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Angebotsersteller, Details eines bestehenden Angebots zu aktualisieren.

Request:

- **URL:** `/api/offers/:offerID`
- **Methode:** `PUT`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'offerOwner' haben.
- **URL-Parameter:** 
  - `offerID`: String - Die ID des Angebots, das aktualisiert werden soll.
- **Anfrage-Body:** 
  - `price`: Dec(10,2) - Der neue Preis, der für das Angebot festgelegt werden soll (optional).
  - `description`: String - Die neue Beschreibung, die für das Angebot festgelegt werden soll (optional).

Beispiel:

```json
{
   "price": 150,
   "description": "Neue Beschreibung des Angebots"
}
```

#### DELETE /api/offers/:offerID

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Angebotsersteller, ein bestimmtes Angebot zu löschen.

Request:

- **URL:** `/api/offers/:offerID`
- **Methode:** `DELETE`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'offerOwner' haben.
- **URL-Parameter:** 
  - `offerID`: String - Die ID des Angebots, das gelöscht werden soll.

---

