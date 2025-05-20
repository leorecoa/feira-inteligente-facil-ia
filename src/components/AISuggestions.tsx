
import SectionTitle from "./SectionTitle";
import AIFeatureCarousel from "./ai/AIFeatureCarousel";
import SuggestionsContainer from "./ai/suggestions/SuggestionsContainer";

export default function AISuggestions() {
  return (
    <div className="mb-8 relative">
      <SectionTitle>Sugestões Inteligentes</SectionTitle>
      
      <AIFeatureCarousel />
      
      <SuggestionsContainer />
    </div>
  );
}
