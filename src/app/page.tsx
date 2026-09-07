import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import StarsSection from "@/components/home/StarsSection";
import Footer from "@/components/layout/Footer";
import Background from "@/components/ui/Background";
import styles from "./page.module.scss";

export default function Home() {
	return (
		<>
			<Header />
			<main className={styles.main}>
				<Background
					className={styles.heroBg}
					fade="down"
					fadeStart={30}
					fadeEnd={100}
					patterns={[{ type: "lines", size: 50 }]}
				/>
				<div id="download">
					<Hero />
				</div>
			</main>
			<StarsSection />
			<Footer />
		</>
	);
}
