import { Query } from '../Domain/query.entity.js';

const queriesData = [
    new Query({
        id: 1,
        userName: 'Ana Torres',
        userAvatar: 'https://i.pravatar.cc/150?img=1',
        experienceName: 'City Tour Arequipa',
        date: '2025-04-18',
        question: '¿La experiencia incluye entradas?',
        isAnswered: false,
        answer: ''
    }),
    new Query({
        id: 2,
        userName: 'Carlos Ramos',
        userAvatar: '',
        experienceName: 'City Tour Cusco',
        date: '2025-04-19',
        question: '¿La experiencia incluye hospedaje?',
        isAnswered: false,
        answer: ''
    }),
    new Query({
        id: 3,
        userName: 'Abby Lopez',
        userAvatar: 'https://i.pravatar.cc/150?img=3',
        experienceName: 'City Tour Arequipa',
        date: '2025-04-20',
        question: '¿Se permiten mascotas en el city tour?',
        isAnswered: false,
        answer: ''
    }),
    new Query({
        id: 4,
        userName: 'Carol Alba',
        userAvatar: 'https://i.pravatar.cc/150?img=4',
        experienceName: 'City Tour Arequipa',
        date: '2025-04-18',
        question: '¿La experiencia incluye entradas?',
        isAnswered: true,
        answer: 'Sí, incluye entradas a todos los lugares.'
    })
];

export const queryService = {
    getAllQueries() {
        return [...queriesData];
    },

    getQueriesByAnswered(isAnswered) {
        return queriesData.filter(q => q.isAnswered === isAnswered);
    },

    searchQueries(searchTerm, isAnswered) {
        return queriesData.filter(q => {
            const lowerTerm = searchTerm.toLowerCase();
            return (
                q.isAnswered === isAnswered &&
                (q.userName.toLowerCase().includes(lowerTerm) ||
                    q.experienceName.toLowerCase().includes(lowerTerm))
            );
        });
    },

    respondToQuery(id, answer) {
        const query = queriesData.find(q => q.id === id);
        if (query) {
            query.isAnswered = true;
            query.answer = answer;
        }
    }
};
