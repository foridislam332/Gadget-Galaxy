
const SectionTitle = ({ type, title }) => {
    return (
        <div className="text-center">
            <h5 className="text-primary text-xl font-semibold mb-2">{type}</h5>
            <h3 className="text-2xl sm:text-3xl md:text-4xl text-dark font-bold drop-shadow-lg">{title}</h3>
        </div>
    );
};

export default SectionTitle;