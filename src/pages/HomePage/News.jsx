import React from 'react'

const News = () => {
    const news = [
        {
            photo: "images/1.jpg",
            date: "15/02/2023",
            titre: "Inscreption pour les nouveaux etudiants",
            contenu: "Pour l'étudiant qui souhaite se joindre à nous, la phase d'application commence en juin où vous postulez à www.ounucs.ma",
            col: 12
        },
        {
            photo: "images/2.jpg",
            date: "10/02/2023",
            titre: "Nouveau club pour la théâtre",
            contenu: "Un nouveau club sera créé concernant l'art du théâtre, les résidents qui souhaitent se joindre s'il vous plaît soumettre votre demande dans l'administration, les places sont limitées",
            col: 3
        },
        {
            photo: "images/3.jpg",
            date: "25/01/2023",
            titre: "Les demandes de changement de chambres ",
            contenu: "l'administration informe les résidents qui souhaitent changer de chambre que la durée de soumettre leur application est fixée à partir de maintenant jusqu'à à la fin du 15 Février",
            col: 3
        },
        {
            photo: "images/cours.jpg",
            date: "01/01/2022",
            titre: "Nouvelle Année",
            contenu: " le cité universitaire Rabat Agdal vous souhaite une bonne an née pleine de succès et de joie",
            col: 3
        }
    ]
    return (
        <div className="container" style={{ "backgroundImage": "url('images/bookNegative.svg')" }}>
            <h1 class="newsHeadline">Les dérniers Actualité : </h1>
            <div className="row justify-content-between">
                {
                    news.map((n, index) => {
                        return (
                            <div className={`my-sm-3 col-sm-12 col-md-${n.col} card`}>
                                <img src={n.photo} class="card-img-top w-75 h-50 d-block mx-auto newsPhoto" alt="..." />
                                <h6 class="card-subtitle my-2 text-muted">{n.date}</h6>
                                <div class="card-body">
                                    <h5 class="card-title">{n.titre}</h5>
                                    <p class="card-text">{n.contenu}....</p>
                                    <a href="#" class="btn newsReadMoreBtn">lire la suite</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default News