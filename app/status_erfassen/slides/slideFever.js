let slide = `
<GridLayout id="fever" row="0" rows="auto, *, *, *, *, *, *">
    <Label id="questionLabel" row="0" text="{{ feverQuery }}" textWrap="true" class="questionText text-center" />
    <Button row="2" id="0" text="{{ feverAnswer0 }}"  class="-btn -btn-primary my-button-grad0 my-button-grad0:active capitalization" tap="{{ switchTab }}" />
    <Button row="3" id="1" text="{{ feverAnswer1 }}"  class="-btn -btn-primary my-button-grad1 my-button-grad1:active capitalization" tap="{{ switchTab }}" />
    <Button row="4" id="2" text="{{ feverAnswer2 }}"  class="-btn -primary my-button-grad2 my-button-grad2:active capitalization" tap="{{ switchTab }}" />
    <Button row="5" id="3" text="{{ feverAnswer3 }}"  class="-btn -primary my-button-grad3 my-button-grad3:active capitalization" tap="{{ switchTab }}" />
    <Button row="6" id="4" text="{{ feverAnswer4 }}"  class="-btn -primary my-button-grad4 my-button-grad4:active capitalization" tap="{{ switchTab }}" />
</GridLayout>
`;

module.exports = {slide};
