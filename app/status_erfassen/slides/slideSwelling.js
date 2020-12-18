let slide = `
<GridLayout id="swelling" row="0" rows="auto, *,*,*,*,*,*">
<Label id="questionLabel" row="0" text="{{ swellingQuery }}" textWrap="true" fontSize="{{ mySize }}" class="questionText text-center" />
<Button row="2" id="0" text="{{ swellingAnswer0 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
<Button row="3" id="1" text="{{ swellingAnswer1 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
<Button row="4" id="2" text="{{ swellingAnswer2 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad2 my-button-grad2:active capitalization" tap="{{ switchTab }}" />
<Button row="5" id="3" text="{{ swellingAnswer3 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad3 my-button-grad3:active capitalization" tap="{{ switchTab }}" />
<Button row="6" id="4" text="{{ swellingAnswer4 }}" textWrap="true" fontSize="{{ mySizeSmall }}" class="-btn my-button-grad4 my-button-grad4:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
