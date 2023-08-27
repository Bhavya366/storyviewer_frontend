import React, { useEffect, useState } from "react";
import './EditStory.css';
import useStoryContext from "../../hooks/useStoryContext";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import BASEURL from "../../constants/base";
const categories = ["food", "health and fitness", "travel", "movies", "education"];

const EditStory = (props) => {
	const { setPopup, setId, setEdit,setCarousel,setChange,change } = useStoryContext();
	const [currentSlide, setCurrentSlide] = useState(0);
	const [formData, setFormData] = useState(props.data);
	const [slides, setSlides] = useState() 
	let slideData = '';

	useEffect(()=>{
		let arr = [...Array(props.data.length).keys()].map(x => ++x)	
		setSlides(arr)
	},[change])
	
	const handleInputChange = (event, currentSlide) => {
		event.preventDefault()
		const { name} = event.target;
	
		const updatedFormData = [...formData];
		updatedFormData[currentSlide] = {
			...updatedFormData[currentSlide],
			[name]: event.target.value
		};
		setFormData(updatedFormData);
		slideData = updatedFormData[currentSlide];
	};

	const handlePrevious = () => {
		setCurrentSlide((prevSlide) => prevSlide - 1);
	};

	const handleNext = () => {
		setCurrentSlide((prevSlide) => prevSlide + 1);
	};

	const deletePopup = () => {
		setPopup(false);
		setEdit(false);
		setCarousel(false);
		setId('')
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		let data = {}
		let username = localStorage.getItem("username")
		data.storyId = slideData.storyId;
		data._id = slideData._id;
		data.heading = slideData.heading;
		data.description = slideData.description;
		data.imageLink = slideData.imageLink;
		data.category = slideData.category;
		
		data.user = username
		data.bookedBy = []
		data.likedBy = []
		data.likeCount = 0
		data.bookmark = false

		try {
			if (
				!data.storyId ||
				!data.heading ||
				!data.category ||
				!data.imageLink ||
				!data.description 
			) {
				toast.error("Please fill all the fields", {
					position: "top-center",
					autoClose: 1000,
				});
				return;
			}
			
			axios.put(`${BASEURL}/slide`, data, {
				headers: {
					authorization: `${localStorage.getItem("token")}`,
				},
			}).then((response)=>{
				setChange(!change);
				toast.success("Story edited Successfully", {
				position: "top-center",
				autoClose: 1000,
				hideProgressBar: true,
			})});
			
		} catch (err) {
			if (err.response.status === 401) {
				toast.error("Please login to add story", {
					position: "top-center",
					autoClose: 1000,
				});
				return;
			}
			toast.error("Something went wrong", {
				position: "top-center",
				autoClose: 1000,
			});
		}
	}

const addSlide = () => {
	if (slides.length < 6) {
		let nextval = slides[slides.length - 1] + 1
		setSlides([...slides, nextval])
	}
}

slideData = formData[currentSlide] || {};

return (
	<div className="addstory-popup">
		<div className="add-form-slides">
			<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 36 36" fill="none" className="into-mark" onClick={() => {
				
				if(formData.length >= 3){
					deletePopup()
				}
				else{
					toast.error("Please fill atleast three slides", {
						position: "top-center",
						autoClose: 1000,
					});
				}
			}}>
				<path d="M17.8191 0C7.99395 0 0 7.99395 0 17.8191C0 27.6442 7.99395 35.6381 17.8191 35.6381C27.6442 35.6381 35.6381 27.6442 35.6381 17.8191C35.6381 7.99395 27.6442 0 17.8191 0ZM17.8191 2.7414C26.1611 2.7414 32.8967 9.47709 32.8967 17.8191C32.8967 26.1611 26.1611 32.8967 17.8191 32.8967C9.47709 32.8967 2.7414 26.1611 2.7414 17.8191C2.7414 9.47709 9.47709 2.7414 17.8191 2.7414ZM12.6361 10.6657L10.6657 12.6361L15.8487 17.8191L10.6657 23.002L12.6361 24.9724L17.8191 19.7894L23.002 24.9724L24.9724 23.002L19.7894 17.8191L24.9724 12.6361L23.002 10.6657L17.8191 15.8487L12.6361 10.6657Z" fill="#FF0000" />
			</svg><br></br>
			<div className="both-slides-form">
				<div className="n-slides">
					{slides ? slides.map((item, index) => {
						return (
							<div key={index} className={currentSlide === index ? "each-slide-selected" : "each-slide"}>
								<h4 >Slide {item} </h4>
							</div>)
					}):''}
					<div className="each-slide" onClick={() => addSlide()}>
						<h4 >Add +</h4>
					</div>
				</div><br></br>
				<form className="addstory-label-input">
					<div className="label-input"><div style={{ width: "30%" }}><h3>Heading:</h3></div>
						<div className="inputs-form">
							<input
							type="text"
							className="addstory-inputs"
							placeholder="Your Heading"
							name="heading"
							value={slideData.heading || " "}
							onChange={(event) => handleInputChange(event, currentSlide)}
							
						/></div>
					</div><br></br>
					<div className="label-input"><div style={{ width: "30%" }}><h3>Description:</h3></div>
						<div className="inputs-form">
							<textarea cols={30} rows={5} style={{ resize: "none" }}
							placeholder="Story Description"
							className="addstory-inputs"
							name="description"
							onChange={(e) => handleInputChange(e, currentSlide)}
							value={slideData.description || " "}
						></textarea></div>
					</div><br></br>
					<div className="label-input"><div style={{ width: "30%" }}><h3>Image:</h3></div>
						<div className="inputs-form"><input
							type="text"
							className="addstory-inputs"
							placeholder="Add image url"
							name="imageLink"
							onChange={(e) => handleInputChange(e, currentSlide)}
							value={slideData.imageLink || ' '}
						/></div>
					</div><br></br>
					<div className="label-input">
						<div style={{ width: "30%" }}><h3>Category:</h3></div>
						<div className="inputs-form">
						<select
							className="addstory-inputs"
							name="category"
							onChange={(e) => handleInputChange(e, currentSlide)}
							value={slideData.category || ' '}
						>
							<option>Select</option>
							{categories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select></div>
					</div>
				</form></div>
			<div className="addstory-form-buttons">
				<div className="previous-next-buttons">
					{currentSlide > 0 && (
						<button onClick={handlePrevious} className="previous-button">Previous</button>
					)}
					{currentSlide < 5 && (
						<button onClick={handleNext} className="next-button">Next</button>
					)}
				</div>
				<div>
					<button onClick={handleSubmit} className="submit-button">Add</button>
				</div>
			</div>
		</div>
		<ToastContainer />
	</div >
	);
};

export default EditStory;

