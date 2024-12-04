let patients = [

  { nom: "Marcus", maladie: "mal indenté", argent: 100, poche: "", etat: "malade" },
  { nom: "Optimus", maladie: "unsave", argent: 200, poche: "", etat: "malade" },
  { nom: "Sangoku", maladie: "404", argent: 80, poche: "", etat: "malade" },
  { nom: "DarthVader", maladie: "azmatique", argent: 110, poche: "", etat: "malade" },
  { nom: "Semicolon", maladie: "syntaxError", argent: 60, poche: "", etat: "malade" }

]

let traitements = {
  "mal indenté": { traitement: "ctrl+maj+f", prix: 60 },
  "unsave": { traitement: "saveOnFocusChange", prix: 100 },
  "404": { traitement: "CheckLinkRelation", prix: 35 },
  "azmatique": { traitement: "Ventoline", prix: 40 },
  "syntaxError": { traitement: "f12+doc", prix: 20 }
}

let docteur = {

  nom: "Debugger",
  argent: 0,
  cabinet: "chat",
  consulter: function(patient) {

    log(`${patient.nom} arrive dans le cabinet de ${this.nom}`)
    log(`Le chat miaule...`)
    patient.argent -= 50
    log(`${patient.nom} a payé 50€ pour la consultation.`)
    patient.etat = "traitement"

  }
}

let pharmacie = {

  traiter: function(patient) {
    log("Bienvenue à la pharmacie!")
    let traitement = traitements[patient.maladie]
    if (patient.argent >= traitement.prix) {
      patient.poche = traitement.traitement
      patient.argent -= traitement.prix
      log(`${patient.nom} a acheté ${traitement.traitement} pour ${traitement.prix}€.`)

    } else {

      log(`${patient.nom} n'a pas assez d'argent pour le traitement.`)
      patient.etat = "mort"
      log(`Dommage, ${patient.nom} est mort. Il n'a pas pu acheter son traitement.`)

    }
  }
}


function log(message) {
  let logElement = document.getElementById("log")
  logElement.textContent += message + '\n'
}

function afficherPatients() {
  let tableBody = document.getElementById("patientsTable").getElementsByTagName('tbody')[0]

  patients.forEach((patient, index) => {
    setTimeout(() => {
      let row = document.createElement("tr")
      let nomCell = document.createElement("td")
      nomCell.textContent = patient.nom

      let maladieCell = document.createElement("td")
      maladieCell.textContent = patient.maladie

      let argentCell = document.createElement("td")
      argentCell.textContent = `${patient.argent}€`

      let etatCell = document.createElement("td")
      etatCell.textContent = patient.etat

      let pocheCell = document.createElement("td")
      pocheCell.textContent = patient.poche

      row.appendChild(nomCell)
      row.appendChild(maladieCell)
      row.appendChild(argentCell)
      row.appendChild(etatCell)
      row.appendChild(pocheCell)

      tableBody.appendChild(row)
    }, index * 1000)
  })
}

function afficherTraitements() {
  let tableBody = document.getElementById("traitementsTable").getElementsByTagName('tbody')[0]

  Object.keys(traitements).forEach((maladie, index) => {
    setTimeout(() => {
      let row = document.createElement("tr")

      let maladieCell = document.createElement("td")
      maladieCell.textContent = maladie

      let traitementCell = document.createElement("td")
      traitementCell.textContent = traitements[maladie].traitement

      let prixCell = document.createElement("td")
      prixCell.textContent = `${traitements[maladie].prix}€`

      row.appendChild(maladieCell)
      row.appendChild(traitementCell)
      row.appendChild(prixCell)

      tableBody.appendChild(row)
    }, index * 1000)
  })
}

function simulation() {
  patients.forEach((patient, index) => {
    setTimeout(() => {
      log(`${patient.nom} quitte la salle d'attente.`)
      docteur.consulter(patient)

      setTimeout(() => {
        log(`${patient.nom} sort du cabinet.`)

        if (patient.etat !== "mort") {
          setTimeout(() => {
            pharmacie.traiter(patient)

            // Vérifier si le patient est mort ou guéri

            setTimeout(() => {

              if (patient.etat === "mort") {
                cimetiere.deces(patient)

              } else {
                log(`${patient.nom} est guéri avec ${patient.poche}.`)
              }
            }, 750) // Vérification de l'état après la pharmacie
          }, 2000) // Délai avant que le patient aille à la pharmacie
        }

      }, 2000) // Sortie après consultation
    }, index * 5000) // Intervalle entre chaque patient
  })
}

document.addEventListener('DOMContentLoaded', () => {
  afficherPatients()
  afficherTraitements()
  setTimeout(() => simulation(), patients.length * 1000)
})
