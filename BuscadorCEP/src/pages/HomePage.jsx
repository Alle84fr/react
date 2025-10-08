import ProfileCard from "../components/ProfileCard";

function HomePage() {
    return(
        <>
        <h1>Página Inical</h1>
        <ProfileCard
            name="João Silva"
            age={34}
            isStudent={true}
        />
        <ProfileCard
            name="Mariana Andrade"
            age={21}
            isStudent={false}
        />
        </>
    );
}

export default HomePage;