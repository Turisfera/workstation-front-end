export class AgenciesApiService {
    async getProfile(agencyId) {
        return Promise.resolve({
            data: {
                id: agencyId,
                name: "Andes Explorer",
                taxId: "10458963214",
                description:
                    "Somos una agencia especializada en experiencias culturales y de aventura en el sur del Perú. Nuestro equipo está comprometido con el turismo sostenible y auténtico, llevando a cada viajero a descubrir la riqueza de nuestra historia, paisajes y tradiciones.",
                rating: 4.9,
                reviewCount: 46,
                reservationCount: 220,
                avatarUrl:
                    "https://www.andeanculture.com.pe/gallery/images/nosotros.jpg",
                contact: {
                    email: "contacto@andesexplorer.pe",
                    phone: "+51 987 654 321",
                },
                socialLinks: {
                    facebook: "https://facebook.com/andesexplorer",
                    instagram: "https://instagram.com/andesexplorer",
                    whatsapp: "https://wa.me/51987654321",
                },
                reviews: [
                    {
                        id: "1",
                        name: "Maria Tess",
                        date: "14/12/2024",
                        rating: 4,
                        comment:
                            "Es puramente mágico. Han puesto mucho amor e intención en ello.",
                        avatar:
                            "https://media.elobservador.com.uy/p/2afb8203cb08636a5ecbaf125a837e23/adjuntos/362/imagenes/100/591/0100591260/256x256/smart/httpswwwbbccommundoarticlesc70qxq4y2dqo.jpg",
                    },
                    {
                        id: "2",
                        name: "Carlos Ruiz",
                        date: "10/12/2024",
                        rating: 5,
                        comment: "Increíble experiencia, lo recomiendo 100%.",
                        avatar:
                            "https://cachedimages.podchaser.com/256x256/aHR0cHM6Ly9kM3Qzb3pmdG1kbWgzaS5jbG91ZGZyb250Lm5ldC9zdGFnaW5nL3BvZGNhc3RfdXBsb2FkZWRfZXBpc29kZS81NzAzMTk5LzU3MDMxOTktMTcxNTYyODk1OTI4NS1mYzU1MjFiMTAxYmE1LmpwZw%3D%3D/aHR0cHM6Ly93d3cucG9kY2hhc2VyLmNvbS9pbWFnZXMvbWlzc2luZy1pbWFnZS5wbmc%3D",
                    },
                ],
            },
        });
    }
}